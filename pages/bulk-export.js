import React, { useCallback, useState } from "react";
import {
  Checkbox,
  Form,
  FormLayout,
  Page,
  Select,
  Layout,
  TextField,
  Card,
  Button,
} from "@shopify/polaris";

function BulkExportForm() {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState("");
  const [objectType, setObjectType] = useState("");

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleAllDataCheckChange = useCallback(
    (value) => setChecked(value),
    []
  );
  const handleObjectTypeChange = useCallback(
    (value) => setObjectType(value),
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

  const exportForm = (
    <Form>
      <FormLayout>
        <Select
          id="object-type"
          label="Object identifier"
          placeholder="Select"
          options={objectTypes}
          onChange={handleObjectTypeChange}
          value={objectType}
        />
        <TextField
          label="Email address"
          onChange={handleEmailChange}
          value={email}
          type="email"
          helpText={
            <span>
              We'll use this email address to deliver the exported file.
            </span>
          }
        />
        <Checkbox
          label="Include all data even if data is empty"
          checked={checked}
          onChange={handleAllDataCheckChange}
        />
        <Button submit primary>
          Export
        </Button>
      </FormLayout>
    </Form>
  );

  return <Card sectioned>{exportForm}</Card>;
}

const BulkExport = () => (
  <Page title="Bulk export">
    <Layout>
      <Layout.Section>
        <BulkExportForm />
      </Layout.Section>
    </Layout>
  </Page>
);
export default BulkExport;
