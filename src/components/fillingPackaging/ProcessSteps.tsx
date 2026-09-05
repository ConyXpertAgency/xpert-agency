import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";
import PictureSvg from "@/components/ui/PictureSvg";
import type { IconType } from "react-icons";

export interface ProcessStep {
  number: string;
  title: string;
  text?: string;
  icon: IconType;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  return (
    <ol className={styles.ProcessSteps} aria-label="Workstreams">
      {steps.map((s, i) => (
        <li key={i} className={styles.ProcessStep}>
          <span className={styles.StepNumber}>{s.number}</span>
          <span className={styles.StepIcon}>
            <PictureSvg icon={s.icon} size={22} />
          </span>
          <strong className={styles.StepTitle}>{s.title}</strong>
          {s.text && <span className={styles.StepText}>{s.text}</span>}
        </li>
      ))}
    </ol>
  );
};

export default ProcessSteps;
