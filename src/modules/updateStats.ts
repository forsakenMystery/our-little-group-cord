import { statInterface } from "../database/models/our_little_group_stat_model";
import { errorHandler } from "../utils/errorHandler";

export const updateCamperData = async (
  Stats: statInterface,
  successful: boolean = true,
  kill_value: number = 1,
  death_value: number = 1
): Promise<statInterface | undefined> => {
  try {
    if (successful) {
      Stats.kill += kill_value;
    } else {
      Stats.death += death_value;
    }
    await Stats.save();
    return Stats;
  } catch (err) {
    errorHandler("updateStats module", err);
    return;
  }
};
