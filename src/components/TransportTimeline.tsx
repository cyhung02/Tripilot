// src/components/TransportTimeline.tsx
import { Fragment, useRef, useEffect, useState, useMemo } from 'react';
import { Train } from '../data/types';

// 定義常數
const TIMELINE_LINE_WIDTH_PX = 2; // 對應 border-l-2 的像素寬度

interface TransportTimelineProps {
    trains: Train[];
}

/**
 * 顯示轉乘行程時間軸
 */
const TransportTimeline: React.FC<TransportTimelineProps> = ({ trains }) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const [timeColumnWidth, setTimeColumnWidth] = useState<number | null>(null);

    // 使用 ResizeObserver 動態計算時間欄的最大寬度
    useEffect(() => {
        if (!timelineRef.current) return;

        const timeColumns = timelineRef.current.querySelectorAll('.time-column');
        if (!timeColumns.length) {
            setTimeColumnWidth(null);
            return;
        }

        // 建立 ResizeObserver 實例
        const observer = new ResizeObserver((entries) => {
            // 找出最大寬度
            const maxWidth = entries.reduce((max, entry) => {
                const width = entry.contentRect.width;
                return width > max ? width : max;
            }, 0);

            setTimeColumnWidth(maxWidth);
        });

        // 觀察所有時間欄
        timeColumns.forEach((column) => observer.observe(column));

        // 清理 observer
        return () => observer.disconnect();
    }, [trains]);

    // 根據 timeColumnWidth 定位時間線
    useEffect(() => {
        if (!timelineRef.current || timeColumnWidth === null) return;

        const blocks = timelineRef.current.querySelectorAll('.timeline-block');
        blocks.forEach((block) => {
            const firstCircle = block.querySelector('.station-circle-first');
            const timelineLine = block.querySelector('.timeline-line');

            if (firstCircle && timelineLine) {
                const circleRect = firstCircle.getBoundingClientRect();
                const blockRect = block.getBoundingClientRect();
                const centerX = Math.round(
                    circleRect.left - blockRect.left + circleRect.width / 2 - TIMELINE_LINE_WIDTH_PX / 2
                );

                (timelineLine as HTMLElement).style.left = `${centerX}px`;
            }
        });
    }, [trains, timeColumnWidth]);

    // 將火車資料分組為區塊 (基於共同的起點/終點站)
    const transportBlocks = useMemo(() => {
        type StationInfo = {
            station: string;
            arrivalTime?: string;
            departureTime?: string;
            isStart?: boolean;
            isEnd?: boolean;
            trainDeparture?: number;
        };

        type TransportBlock = {
            stations: StationInfo[];
        };

        const blocks: TransportBlock[] = [];

        trains.forEach((train, idx) => {
            // 判斷是否需要創建新區塊
            const isNewBlock = idx === 0 || train.from !== blocks.at(-1)!.stations.at(-1)!.station;

            if (isNewBlock) {
                // 創建新區塊
                blocks.push({
                    stations: [
                        {
                            station: train.from,
                            departureTime: train.departureTime,
                            isStart: idx === 0,
                            trainDeparture: idx,
                        },
                    ],
                });
            } else {
                // 更新既有區塊的最後一個站點
                const prevStation = blocks.at(-1)!.stations.at(-1)!;
                prevStation.departureTime = train.departureTime;
                prevStation.trainDeparture = idx;
            }

            // 添加目的地站點
            blocks.at(-1)!.stations.push({
                station: train.to,
                arrivalTime: train.arrivalTime,
                isEnd: idx === trains.length - 1,
            });
        });

        return blocks;
    }, [trains]);

    return (
        <div>
            <h4 className="text-sm font-bold text-purple-700 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-1 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14h6"></path>
                    <path d="M9 18h6"></path>
                    <path d="M9 10h6"></path>
                </svg>
                轉乘行程
            </h4>

            <div ref={timelineRef}>
                {transportBlocks.map((block, blockIdx) => (
                    <Fragment key={`transport-block-${blockIdx}`}>
                        {/* 轉乘指示 */}
                        {blockIdx > 0 && (
                            <div className="relative timeline-block">
                                <div className="grid grid-cols-[minmax(auto,max-content)_auto_1fr] items-center">
                                    <div className="timeline-line absolute border-l-2 border-purple-300 border-dashed -top-2 -bottom-2 z-0" style={{ width: `${TIMELINE_LINE_WIDTH_PX}px` }}></div>
                                    <div className="time-column mr-2" style={timeColumnWidth ? { width: timeColumnWidth, minWidth: timeColumnWidth } : {}}></div>
                                    <div className="flex justify-center relative station-circle-first">
                                        <div className="w-4 h-4 rounded-full border-2 border-solid z-10 opacity-0"></div>
                                    </div>
                                    <div className="pl-2 py-2">
                                        <svg className="w-5 h-5 mr-1 text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" stroke="none">
                                            <path d="M9.5 7.063c0-1.25-1.031-2.281-2.313-2.281-1.25 0-2.25 1.031-2.25 2.281 0 1.281 1 2.281 2.25 2.281 1.281 0 2.313-1 2.313-2.281zM7.031 27.188h-2.031s-0.094-5.781 0.063-6.469c0.125-0.688 1.469-2.125 1.531-2.688 0.063-0.594-0.531-3.031-0.531-3.031s-1.344 1.219-1.781 1.438-3.875 0.781-3.875 0.781l-0.406-1.75s3.281-0.719 3.75-1.094c0.469-0.344 1.719-3.375 2.656-3.75 0.625-0.281 2.313-0.156 3.156-0.156 0.875 0 3.75 1.656 4.031 2.031 0.313 0.344 2.031 3.719 2.031 3.719l-1.563 0.875-1.25-2.688s-0.969-0.813-1.344-0.938c-0.406-0.125-0.938-0.281-1.031 0.063-0.125 0.313 0.719 2.875 0.938 3.594 0.188 0.75 1.219 4.156 1.594 4.875s2.594 3.906 2.594 3.906l-1.906 1.25s-2.719-3.688-3.063-4.219c-0.375-0.531-1.438-3.375-1.438-3.375s-1.813 2.219-1.969 2.906c-0.125 0.625-0.156 4.719-0.156 4.719z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 時間軸區塊 */}
                        <div className="relative timeline-block">
                            <div className="grid grid-cols-[minmax(auto,max-content)_auto_1fr] items-center relative">
                                <div className="timeline-line absolute bg-purple-300 top-2 bottom-2 z-0" style={{ width: `${TIMELINE_LINE_WIDTH_PX}px` }}></div>

                                {block.stations.flatMap((station, stationIdx) => {
                                    // 結合站點和車次資訊呈現
                                    const result = [
                                        // 站點時間
                                        <div key={`station-time-${blockIdx}-${stationIdx}`} className="text-right mr-2 time-column" style={timeColumnWidth ? { width: timeColumnWidth, minWidth: timeColumnWidth } : {}}>
                                            {station.arrivalTime && (
                                                <div className="text-xs text-purple-600 font-semibold">{station.arrivalTime}</div>
                                            )}
                                            {station.departureTime && (
                                                <div className="text-xs text-purple-600 font-semibold">{station.departureTime}</div>
                                            )}
                                        </div>,

                                        // 站點圓圈
                                        <div key={`station-circle-${blockIdx}-${stationIdx}`} className="flex justify-center relative">
                                            <div className={`w-4 h-4 rounded-full border-2 border-solid bg-white z-10 ${station.isStart || station.isEnd ? 'border-purple-500' : 'border-purple-300'} ${stationIdx === 0 ? 'station-circle-first' : ''}`}></div>
                                        </div>,

                                        // 站點名稱
                                        <div key={`station-name-${blockIdx}-${stationIdx}`} className="pl-2">
                                            <div className={`font-medium text-sm ${station.isStart || station.isEnd ? 'text-purple-700' : 'text-purple-600'}`}>{station.station}</div>
                                        </div>,
                                    ];

                                    // 出發車次資訊
                                    if (station.trainDeparture !== undefined) {
                                        result.push(
                                            <div key={`train-time-${blockIdx}-${stationIdx}`} className="text-right mr-2 time-column" style={timeColumnWidth ? { width: timeColumnWidth, minWidth: timeColumnWidth } : {}}></div>,
                                            <div key={`train-circle-${blockIdx}-${stationIdx}`} className="flex justify-center relative"></div>,
                                            <div key={`train-info-${blockIdx}-${stationIdx}`} className="pl-2 my-3">
                                                <div className="py-2 px-3 bg-white rounded-lg shadow-sm border border-purple-100 text-xs inline-block hover:bg-purple-50 transition-all duration-200">
                                                    <div className="font-medium text-purple-700 whitespace-nowrap text-xs">{trains[station.trainDeparture].trainNumber}</div>
                                                    {trains[station.trainDeparture].isReserved && (
                                                        <div className="flex items-center text-green-600 text-xs mt-1 whitespace-nowrap">
                                                            <svg className="w-3 h-3 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                            已預訂
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }

                                    return result;
                                })}
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default TransportTimeline;