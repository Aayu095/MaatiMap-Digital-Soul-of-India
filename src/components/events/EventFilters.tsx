import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { EventCategory } from '@/lib/types';

interface EventFiltersProps {
    onFilterChange: (filters: FilterState) => void;
    className?: string;
}

export interface FilterState {
    category?: EventCategory;
    state?: string;
    month?: string;
}

const categories: { value: EventCategory; label: string }[] = [
    { value: 'festivals', label: 'Festivals' },
    { value: 'rituals', label: 'Rituals' },
    { value: 'music', label: 'Music' },
    { value: 'dance', label: 'Dance' },
    { value: 'food', label: 'Food' },
    { value: 'heritage', label: 'Heritage' },
    { value: 'cultural', label: 'Cultural' },
];

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export function EventFilters({ onFilterChange, className = '' }: EventFiltersProps) {
    const [filters, setFilters] = useState<FilterState>({});

    const handleCategoryChange = (value: string) => {
        if (value === 'all') {
            const newFilters = { ...filters };
            delete newFilters.category;
            setFilters(newFilters);
            onFilterChange(newFilters);
        } else {
            const newFilters = { ...filters, category: value as EventCategory };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const handleStateChange = (value: string) => {
        if (value === 'all') {
            const newFilters = { ...filters };
            delete newFilters.state;
            setFilters(newFilters);
            onFilterChange(newFilters);
        } else {
            const newFilters = { ...filters, state: value };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const handleMonthChange = (value: string) => {
        if (value === 'all') {
            const newFilters = { ...filters };
            delete newFilters.month;
            setFilters(newFilters);
            onFilterChange(newFilters);
        } else {
            const newFilters = { ...filters, month: value };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    const clearFilters = () => {
        setFilters({});
        onFilterChange({});
    };

    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
            {/* Horizontal Filter Layout */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Filter Icon & Title */}
                <div className="flex items-center gap-2 md:min-w-[120px]">
                    <Filter className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Filter by:</span>
                </div>

                {/* Filter Controls */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Category Filter */}
                    <Select
                        value={filters.category || 'all'}
                        onValueChange={handleCategoryChange}
                    >
                        <SelectTrigger className="text-sm">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* State Filter */}
                    <Select
                        value={filters.state || 'all'}
                        onValueChange={handleStateChange}
                    >
                        <SelectTrigger className="text-sm">
                            <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                            <SelectItem value="all">All States</SelectItem>
                            {indianStates.map((state) => (
                                <SelectItem key={state} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Month Filter */}
                    <Select
                        value={filters.month || 'all'}
                        onValueChange={handleMonthChange}
                    >
                        <SelectTrigger className="text-sm">
                            <SelectValue placeholder="All Months" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Months</SelectItem>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Clear Button */}
                {activeFilterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs whitespace-nowrap"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                        {filters.category && (
                            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                {filters.category}
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => {
                                        const newFilters = { ...filters };
                                        delete newFilters.category;
                                        setFilters(newFilters);
                                        onFilterChange(newFilters);
                                    }}
                                />
                            </Badge>
                        )}
                        {filters.state && (
                            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                {filters.state}
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => {
                                        const newFilters = { ...filters };
                                        delete newFilters.state;
                                        setFilters(newFilters);
                                        onFilterChange(newFilters);
                                    }}
                                />
                            </Badge>
                        )}
                        {filters.month && (
                            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                                {filters.month}
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => {
                                        const newFilters = { ...filters };
                                        delete newFilters.month;
                                        setFilters(newFilters);
                                        onFilterChange(newFilters);
                                    }}
                                />
                            </Badge>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
