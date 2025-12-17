"use client";

import React from 'react';

interface CulturalCardProps {
    icon: string;
    title: string;
    description: string;
    color: 'purple' | 'pink' | 'green' | 'orange' | 'yellow';
}

const colorClasses = {
    purple: 'bg-purple-100 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800/30',
    pink: 'bg-pink-100 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800/30',
    green: 'bg-green-100 border-green-200 dark:bg-green-950/30 dark:border-green-800/30',
    orange: 'bg-orange-100 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800/30',
    yellow: 'bg-yellow-100 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800/30',
};

const iconColorClasses = {
    purple: 'text-purple-600 dark:text-purple-400',
    pink: 'text-pink-600 dark:text-pink-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
};

export function CulturalCard({ icon, title, description, color }: CulturalCardProps) {
    return (
        <div
            className={`
        p-4 rounded-lg border-2 transition-all duration-200
        hover:scale-105 hover:shadow-md
        ${colorClasses[color]}
      `}
        >
            <div className="flex items-start gap-3">
                <div className={`text-2xl ${iconColorClasses[color]}`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
