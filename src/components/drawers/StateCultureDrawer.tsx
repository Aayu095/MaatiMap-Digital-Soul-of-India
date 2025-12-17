"use client";

import React from 'react';
import { DrawerLayout } from './DrawerLayout';
import { CulturalCard } from './CulturalCard';
import { Button } from '@/components/ui/button';

interface StateData {
    name: string;
    nameHindi: string;
    culture: string;
    art: string;
    folk: string;
    famous: string;
    festivals: string;
    food: string;
}

interface StateCultureDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    stateData: StateData | null;
}

export function StateCultureDrawer({ isOpen, onClose, stateData }: StateCultureDrawerProps) {
    if (!stateData) return null;

    return (
        <DrawerLayout
            isOpen={isOpen}
            onClose={onClose}
            title={stateData.nameHindi || stateData.name}
        >
            <div className="space-y-3">
                {/* Cultural Cards Grid */}
                <div className="grid grid-cols-1 gap-3">
                    <CulturalCard
                        icon="🎭"
                        title="संस्कृति"
                        description={stateData.culture}
                        color="purple"
                    />

                    <CulturalCard
                        icon="🍛"
                        title="भोजन"
                        description={stateData.food}
                        color="pink"
                    />

                    <CulturalCard
                        icon="🎨"
                        title="लोक कला"
                        description={stateData.art}
                        color="green"
                    />

                    <CulturalCard
                        icon="✨"
                        title="कलाएं"
                        description={stateData.folk}
                        color="orange"
                    />

                    <CulturalCard
                        icon="🎉"
                        title="त्योहार"
                        description={stateData.festivals}
                        color="pink"
                    />

                    <CulturalCard
                        icon="🏛️"
                        title="प्रसिद्ध"
                        description={stateData.famous}
                        color="yellow"
                    />
                </div>

                {/* Read More Button */}
                <div className="pt-4">
                    <Button className="w-full" variant="default">
                        और पढ़ें
                    </Button>
                </div>
            </div>
        </DrawerLayout>
    );
}
