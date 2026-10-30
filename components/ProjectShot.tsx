import { ViewTransition } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/content/projects";

/**
 * A project screenshot that morphs between the home-page card and the
 * case-study hero: both render this with the same slug, so React pairs them
 * in a view transition on navigation.
 */
export function ProjectShot({
  slug,
  image,
  eager = false,
  sizes,
  className = "",
}: {
  slug: string;
  image: ProjectImage;
  eager?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <ViewTransition name={`shot-${slug}`} share="morph" default="none">
      <Image
        src={image.src}
        alt={image.alt}
        width={1600}
        height={1000}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={className}
      />
    </ViewTransition>
  );
}
