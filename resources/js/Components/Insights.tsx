import React from 'react';
import {Icon} from "@iconify/react";
import Markdown from "react-markdown";
import { useLaravelReactI18n } from 'laravel-react-i18n';

export const Insights = ({ insights }: { insights: Record<string, string> }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="stalker-panel">
            <h2 className="stalker-header flex items-center gap-2">
                <Icon icon="lucide:terminal" className="w-5 h-5"/>
                {t('Status Report')}
            </h2>
            <div className="stalker-grid border-0 bg-transparent">
                <div className="stalker-item">
                    <div className="flex justify-between items-center">
                        <span className="text-sm opacity-80">{t('Current version')}</span>
                        <span className="text-green-400 text-sm">{insights['game_version'] || '-'}</span>
                    </div>
                </div>
                <div className="stalker-item">
                    <div className="flex justify-between items-center">
                        <span className="text-sm opacity-80">{t('Last Patch Date')}</span>
                        <span className="text-gray-400 text-sm">{insights['last_patch_date'] || '-'}</span>
                    </div>
                </div>
                <div className="stalker-item">
                    <div className="flex justify-between items-center">
                        <span className="text-sm opacity-80">{t('SDK Status')}</span>
                        <span className="text-yellow-400 text-sm">{insights['sdk_status'] || '-'}</span>
                    </div>
                </div>

                <div className="stalker-description mt-2 self-stretch">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                        <Icon icon="lucide:triangle-alert" className="w-4 h-4"/>
                        <span className="text-sm">{insights['sdk_phase'] || '-'}</span>
                    </div>
                    <Markdown>{insights['sdk_forecast'] || '-'}</Markdown>
                </div>
            </div>
        </div>
    );
};
