import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@app/primitives";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

type Props = {
  current: number;
  previous?: number;
  previousFormatted?: string;
  className?: string;
};

export function GrowthIndicator(props: Props) {
  if (props.previous === 0 && props.current === 0) return null;
  if (props.previous === undefined || props.previous === 0) return null;

  const growth = (props.current - props.previous) / props.previous;
  const isUp = growth > 0;
  const isDown = growth < 0;

  const growthColor = isUp ? "text-success" : "text-destructive";

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span
            className={`text-sm flex font-medium items-center ${growthColor} ${props.className}`}
          >
            {isUp && <IconTrendingUp className="h-3 w-3" />}
            {isDown && <IconTrendingDown className="h-3 w-3" />}
            <span className="ml-0.5">{Math.floor(growth * 100)}%</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-muted-foreground">
            Compared to{" "}
            <span className="text-foreground">{props.previousFormatted}</span>{" "}
            last period
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
