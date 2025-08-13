/* eslint-disable @typescript-eslint/no-explicit-any */
type Schema = {
  [key: string]: any;
};

export const JsonLdSchema = ({ schema }: { schema: Schema }) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
