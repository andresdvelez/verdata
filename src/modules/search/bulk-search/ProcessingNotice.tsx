interface ProcessingNoticeProps {
  show: boolean;
}

export const ProcessingNotice = ({ show }: ProcessingNoticeProps) => {
  if (!show) return null;

  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start gap-3">
        <i
          className="icon-[mdi--alert-circle-outline] size-5 text-amber-600 mt-0.5"
          role="img"
          aria-hidden="true"
        />
        <div className="text-sm">
          <p className="font-medium text-amber-800">Important Notes:</p>
          <ul className="text-amber-700 mt-1 space-y-1">
            <li>• Large files may take several minutes to process</li>
            <li>• Results will be downloaded automatically when ready</li>
            <li>• Each search counts towards your usage quota</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
