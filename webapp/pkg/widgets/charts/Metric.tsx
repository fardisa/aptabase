import clsx from "clsx";
import { GrowthIndicator } from "../GrowthIndicator";
import { formatDuration, intervalToDuration } from "date-fns";

type Props = {
  label: string;
  current: number;
  previous?: number;
  active?: boolean;
  activeClassName?: string;
  onClick?: VoidFunction;
  format: "duration" | "number";
};

const formatDistanceLocale: Record<string, string> = {
  xSeconds: "{{count}}s",
  xMinutes: "{{count}}m",
  xHours: "{{count}}h",
};

const shortEnLocale: Locale = {
  formatDistance: (token, count) =>
    formatDistanceLocale[token].replace("{{count}}", count),
};

function formatNumber(value: number, format: Props["format"]): string {
  if (format === "duration") {
    if (value === 0) return "0s";

    return formatDuration(
      intervalToDuration({
        start: 0,
        end: value * 1000,
      }),
      {
        format: ["hours", "minutes", "seconds"],
        locale: shortEnLocale,
      }
    );
  }

  return value.toString();
}

export function Metric(props: Props) {
  const Container = props.onClick ? "button" : "div";

  return (
    <Container
      className={clsx("flex flex-col py-2 px-4 rounded min-w-[6rem]", {
        "hover:bg-accent": props.onClick,
      })}
      onClick={props.onClick}
    >
      <div className="text-2xl font-semibold">
        {formatNumber(props.current, props.format)}
      </div>
      <div className="text-sm text-muted-foreground">
        {props.label}{" "}
        <div
          className={clsx(
            "ml-1 p-1 inline-block rounded",
            props.activeClassName,
            {
              invisible: !props.active,
            }
          )}
        />
      </div>
      <GrowthIndicator
        className="mt-1"
        current={props.current}
        previous={props.previous}
        previousFormatted={`${formatNumber(
          props.previous ?? 0,
          props.format
        )} ${props.label.toLowerCase()}`}
      />
    </Container>
  );
}
