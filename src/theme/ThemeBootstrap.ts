import { ThemeManager } from "./ThemeManager";
import { ThemeRegistry } from "./ThemeRegistry";

export async function bootstrapTheme(
  themeRoot: string
): Promise<ThemeRegistry> {
  const registry = new ThemeRegistry();

  const manager = new ThemeManager(registry);

  const result =
    await manager.loadAndActivate(themeRoot);

  if (!result.success) {
    throw new Error(
      `Failed to bootstrap theme: ${result.errors.join(", ")}`
    );
  }

  return registry;
}