"use client";

import { NextSeo } from "next-seo";
import { JsonLdSchema } from "../components/common/JsonLdSchema";

interface SeoProps {
  title: string;
  description: string;
  schema: object;
}

export const SeoClientComponent = ({
  title,
  description,
  schema,
}: SeoProps) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      <JsonLdSchema schema={schema} />
    </>
  );
};
