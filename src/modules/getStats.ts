import { errorHandler } from "../utils/errorHandler";
import Stat, {
  statInterface,
} from "../database/models/our_little_group_stat_model";

export const getStats = async (
  id: string,
  named: string
): Promise<statInterface | undefined> => {
  try {
    const target = await Stat.findOne({ discordId: id });

    if (target) {
      return target;
    }

    const newStat = await Stat.create({
      discordId: id,
      name: named,
      kill: 0,
      death: 0,
    });

    return newStat;
  } catch (error) {
    errorHandler("get Stats module", error);
    return;
  }
};
