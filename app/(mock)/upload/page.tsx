'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AlertPanel, SectionCard, StatusTag } from '@/components/mock/ui';

type StepState = 'idle' | 'analyzing' | 'done';

const ANALYZE_SECONDS = 7;

export default function UploadPage() {
  const [stepState, setStepState] = useState<StepState>('idle');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState<number>(ANALYZE_SECONDS);

  useEffect(() => {
    if (stepState !== 'analyzing') return;

    setSecondsLeft(ANALYZE_SECONDS);
    const countdownTimer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const doneTimer = setTimeout(() => {
      setStepState('done');
      clearInterval(countdownTimer);
      setSecondsLeft(0);
    }, ANALYZE_SECONDS * 1000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(doneTimer);
    };
  }, [stepState]);

  const canAnalyze = useMemo(() => selectedFileName.length > 0 && stepState !== 'analyzing', [selectedFileName, stepState]);

  return (
    <div className="page-stack">
      <SectionCard title="CSVアップロード">
        <div className="upload-flow">
          <label className="file-picker" htmlFor="csv-upload">
            <span>CSVファイルを選択</span>
            <input
              id="csv-upload"
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setSelectedFileName(file.name);
                setStepState('idle');
                setSecondsLeft(ANALYZE_SECONDS);
              }}
            />
          </label>

          <div className="status-row">
            <StatusTag tone={selectedFileName ? 'success' : 'default'}>{selectedFileName ? `選択中: ${selectedFileName}` : 'CSV未選択'}</StatusTag>
            <StatusTag tone={stepState === 'done' ? 'success' : stepState === 'analyzing' ? 'warning' : 'default'}>
              {stepState === 'idle' && '待機中'}
              {stepState === 'analyzing' && `解析中 (${secondsLeft}秒)`}
              {stepState === 'done' && '解析完了'}
            </StatusTag>
          </div>

          <button type="button" className="primary-button" disabled={!canAnalyze} onClick={() => setStepState('analyzing')}>
            解析
          </button>
        </div>
      </SectionCard>

      {stepState === 'analyzing' ? (
        <AlertPanel title="解析中">
          <p>希望提出データと現場マスタを照合しています。完了までお待ちください。</p>
        </AlertPanel>
      ) : null}

      {stepState === 'done' ? (
        <AlertPanel title="解析が完了しました">
          <p>CSVをもとにベースシフト案を作成しました。内容確認へ進んでください。</p>
          <div>
            <Link href="/autoview" className="primary-button">
              シフト確認
            </Link>
          </div>
        </AlertPanel>
      ) : null}
    </div>
  );
}
