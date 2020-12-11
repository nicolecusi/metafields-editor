import {
  Card,
  Layout,
  Page,
  FormLayout,
  TextStyle,
  Link,
  Stack,
  Select,
  InlineError,
  Form,
  Button,
  TextField,
} from "@shopify/polaris";

import React, { useCallback, useState } from "react";
import ImportDropzone from "../src/components/ImportDropzone";

function BulkImportForm() {
  const [type, setType] = useState("product");
  const [identifier, setIdentifier] = useState("handle");

  const handleObjectTypeChange = useCallback((value) => setType(value), []);
  const handleObjectIdentifierChange = useCallback(
    (value) => setIdentifier(value),
    []
  );

  const objectTypes = [
    { label: "Product", value: "product" },
    { label: "Variant", value: "variant" },
    { label: "Article", value: "article" },
    { label: "Custom collection", value: "custom-collection" },
    { label: "Smart collection", value: "smart-collection" },
    { label: "Blog", value: "blog" },
    { label: "Page", value: "page" },
    { label: "Order", value: "order" },
    { label: "Customer", value: "customer" },
    { label: "Shop", value: "shop" },
  ];

  const objectIdentifiers = [
    { label: "Handle", value: "handle" },
    { label: "SKU", value: "sku" },
    { label: "ID", value: "id" },
  ];

  const formGroupMarkup = (
    <Form>
      <FormLayout>
        <Select
          id="object-type"
          label="Object type"
          placeholder="Select"
          options={objectTypes}
          onChange={handleObjectTypeChange}
          value={type}
        />
        <Select
          id="object-identifier"
          label="Object identifier"
          placeholder="Select"
          options={objectIdentifiers}
          onChange={handleObjectIdentifierChange}
          value={identifier}
        />
        <ImportDropzone />
        <TextField label="Notification email address"></TextField>
        <Button primary>Import</Button>
      </FormLayout>
    </Form>
  );

  return <Card sectioned>{formGroupMarkup}</Card>;
}

const BulkImport = () => (
  <Page title="Bulk Import">
    <Layout>
      <Layout.Section>
        <BulkImportForm />
      </Layout.Section>
    </Layout>
  </Page>
);
export default BulkImport;
