'use client';

import React, { useState } from 'react';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCulturalItemsByState } from '@/hooks/use-cultural-items-by-state';
import Link from 'next/link';
import Image from 'next/image';
import type { CulturalItem } from '@/lib/types';

interface StateInfo {
    name: string;
    culture: string;
    art: string;
    folk: string;
    famous: string;
    festivals: string;
    food: string;
}

interface StateDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    stateName: string | null;
    stateInfo: StateInfo | null;
}

export function StateDetailModal({ isOpen, onClose, stateName, stateInfo }: StateDetailModalProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    // Fetch cultural items for this state
    const { data: culturalItems = [], isLoading } = useCulturalItemsByState({
        state: stateName || '',
        category: selectedCategory,
        enabled: isOpen && !!stateName,
    });

    if (!stateName || !stateInfo) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                        {stateInfo.name}
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="items"
                            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600"
                        >
                            Cultural Items ({culturalItems.length})
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                                        🏛️ संस्कृति
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{stateInfo.culture}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-purple-500 bg-purple-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                                        🎨 कलाएं
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{stateInfo.art}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-green-500 bg-green-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                                        💃 लोक कला
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{stateInfo.folk}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-orange-500 bg-orange-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                                        ⭐ प्रसिद्ध
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{stateInfo.famous}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-pink-500 bg-pink-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                                        🎉 त्योहार
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{stateInfo.festivals}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                                        🍛 भोजन
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{stateInfo.food}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Cultural Items Tab */}
                    <TabsContent value="items" className="space-y-4">
                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            <Badge
                                variant={selectedCategory === undefined ? 'default' : 'outline'}
                                className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
                                onClick={() => setSelectedCategory(undefined)}
                            >
                                All
                            </Badge>
                            {['art', 'food', 'heritage-sites', 'rituals', 'music', 'festivals'].map((cat) => (
                                <Badge
                                    key={cat}
                                    variant={selectedCategory === cat ? 'default' : 'outline'}
                                    className={`cursor-pointer capitalize ${selectedCategory === cat
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat.replace('-', ' ')}
                                </Badge>
                            ))}
                        </div>

                        {/* Items Grid */}
                        {isLoading ? (
                            <div className="text-center py-8 text-gray-600">
                                Loading cultural items...
                            </div>
                        ) : culturalItems.length === 0 ? (
                            <div className="text-center py-8 text-gray-600">
                                No cultural items found for {stateName}.
                                <br />
                                <span className="text-sm text-gray-500">Data will be available after seeding.</span>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {culturalItems.map((item) => (
                                    <Link key={item.id} href={`/discover/${item.category}/${item.id}`}>
                                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-white border-gray-200">
                                            <div className="relative h-40 w-full">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover rounded-t-lg"
                                                />
                                            </div>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-base line-clamp-1 text-gray-900">
                                                    {item.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-2 text-gray-600">
                                                    {item.summary}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex gap-2 flex-wrap">
                                                    <Badge variant="secondary" className="text-xs capitalize bg-orange-100 text-orange-800 border-orange-200">
                                                        {item.category.replace('-', ' ')}
                                                    </Badge>
                                                    {item.tags.slice(0, 2).map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-300">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
