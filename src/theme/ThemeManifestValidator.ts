import type { ThemeManifest } from "./ThemeManifest";

export type ThemeManifestValidationResult =
  | {
      valid: true;
      manifest: ThemeManifest;
    }
  | {
      valid: false;
      errors: string[];
    };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateThemeManifest(
  value: unknown
): ThemeManifestValidationResult {
  const errors: string[] = [];

  if (!value || typeof value !== "object") {
    return {
      valid: false,
      errors: ["Manifest must be an object."],
    };
  }

  const manifest = value as Record<string, unknown>;

  if (!isNonEmptyString(manifest.id)) {
    errors.push("Manifest id is required.");
  }

  if (!isNonEmptyString(manifest.name)) {
    errors.push("Manifest name is required.");
  }

  if (!isNonEmptyString(manifest.version)) {
    errors.push("Manifest version is required.");
  }

  if (!isNonEmptyString(manifest.author)) {
    errors.push("Manifest author is required.");
  }

  if (!isNonEmptyString(manifest.description)) {
    errors.push("Manifest description is required.");
  }

  if (!isNonEmptyString(manifest.thumbnail)) {
    errors.push("Manifest thumbnail is required.");
  }

  const compatibility = manifest.compatibility;

  if (
    !compatibility ||
    typeof compatibility !== "object"
  ) {
    errors.push(
      "Manifest compatibility is required."
    );
  } else {
    const compatibilityRecord =
      compatibility as Record<string, unknown>;

    if (
      !isNonEmptyString(
        compatibilityRecord.minAppVersion
      )
    ) {
      errors.push(
        "Manifest compatibility.minAppVersion is required."
      );
    }
  }

  const assets = manifest.assets;

  if (!assets || typeof assets !== "object") {
    errors.push("Manifest assets are required.");
  } else {
    const assetsRecord =
      assets as Record<string, unknown>;

    const animation = assetsRecord.animation;

    if (
      !animation ||
      typeof animation !== "object"
    ) {
      errors.push(
        "Manifest assets.animation is required."
      );
    } else {
      const animationRecord =
        animation as Record<string, unknown>;

      if (
        !isNonEmptyString(
          animationRecord.frame01HighRes
        )
      ) {
        errors.push(
          "Animation frame01HighRes is required."
        );
      }

      if (
        !isNonEmptyString(
          animationRecord.spriteSheet
        )
      ) {
        errors.push(
          "Animation spriteSheet is required."
        );
      }

      if (
        !isNonEmptyString(
          animationRecord.frame25HighRes
        )
      ) {
        errors.push(
          "Animation frame25HighRes is required."
        );
      }
    }

    const visual = assetsRecord.visual;

    if (
      !visual ||
      typeof visual !== "object"
    ) {
      errors.push(
        "Manifest assets.visual is required."
      );
    } else {
      const visualRecord =
        visual as Record<string, unknown>;

      if (
        !isNonEmptyString(
          visualRecord.backgroundPortrait
        )
      ) {
        errors.push(
          "Visual backgroundPortrait is required."
        );
      }

      if (
        !isNonEmptyString(
          visualRecord.backgroundLandscape
        )
      ) {
        errors.push(
          "Visual backgroundLandscape is required."
        );
      }

      if (
        !isNonEmptyString(visualRecord.hero)
      ) {
        errors.push(
          "Visual hero is required."
        );
      }
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  return {
    valid: true,
    manifest: value as ThemeManifest,
  };
}