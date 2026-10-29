/** Pure logic for the Tawaf and Sa'i counters (no religious validation is implied). */

export const LAP_TOTAL = 7;

export interface CounterState {
  /** Timestamps of each confirmed lap; length = laps completed. */
  laps: number[];
}

export type CounterAction =
  | { type: "increment"; at: number }
  | { type: "undo" }
  | { type: "reset" }
  | { type: "hydrate"; laps: number[] };

export function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment":
      if (state.laps.length >= LAP_TOTAL) return state;
      return { laps: [...state.laps, action.at] };
    case "undo":
      if (state.laps.length === 0) return state;
      return { laps: state.laps.slice(0, -1) };
    case "reset":
      return { laps: [] };
    case "hydrate":
      return { laps: action.laps.slice(0, LAP_TOTAL) };
  }
}

export type SaiPoint = "safa" | "marwa";

/** Lap n (1-based) of Sa'i: odd laps go Safa → Marwa, even laps Marwa → Safa. */
export function saiLeg(lap: number): { from: SaiPoint; to: SaiPoint } {
  return lap % 2 === 1 ? { from: "safa", to: "marwa" } : { from: "marwa", to: "safa" };
}
