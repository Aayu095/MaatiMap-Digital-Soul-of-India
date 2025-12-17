"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DrawerLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function DrawerLayout({ isOpen, onClose, title, children }: DrawerLayoutProps) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[1000] transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`
          fixed z-[1001] bg-background shadow-2xl transition-all duration-300 ease-in-out
          
          /* Desktop: Right side */
          md:top-0 md:right-0 md:h-full md:w-[450px]
          ${isOpen ? 'md:translate-x-0' : 'md:translate-x-full'}
          
          /* Mobile: Bottom */
          bottom-0 left-0 right-0 md:left-auto
          max-h-[85vh] md:max-h-full
          rounded-t-2xl md:rounded-none
          ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
        `}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-background border-b border-border p-4 md:p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold font-headline">{title}</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto h-[calc(100%-80px)] md:h-[calc(100%-88px)] p-4 md:p-6">
                    {children}
                </div>
            </div>
        </>
    );
}
