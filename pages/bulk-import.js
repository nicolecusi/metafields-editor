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
  DropZone,
} from "@shopify/polaris";

import React, { useCallback, useState } from "react";

function BulkImportForm() {
  // Form field values
  const [objectType, setType] = useState("product");
  const [objectIdentifier, setIdentifier] = useState("handle");
  const [email, setEmail] = useState("");

  // Form field change actions
  const handleObjectTypeChange = useCallback((value) => setType(value), []);
  const handleObjectIdentifierChange = useCallback(
    (value) => setIdentifier(value),
    []
  );
  const handleEmailChange = useCallback((value) => setEmail(value), []);

  // Form submit
  const handleSubmit = useCallback((_event) => {
    setEmail("");
  }, []);

  // Other variables
  const errorMessage = generateErrorMessage();
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
  function generateErrorMessage() {
    const productVariantError =
      objectType === "variant" && objectIdentifier !== "sku"
        ? "The object identifier must be SKU if the object type is Variant"
        : "";

    if (!productVariantError) {
      return "";
    }

    return (
      <span>
        <TextStyle variation="negative">
          <p>{productVariantError}</p>
        </TextStyle>
      </span>
    );
  }

  const formGroupMarkup = (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Select
          id="object-type"
          label="Object type"
          placeholder="Select"
          options={objectTypes}
          onChange={handleObjectTypeChange}
          value={objectType}
        />
        <Select
          id="object-identifier"
          label="Object identifier"
          placeholder="Select"
          options={objectIdentifiers}
          onChange={handleObjectIdentifierChange}
          value={objectIdentifier}
          error={Boolean(
            objectType === "variant" && objectIdentifier !== "sku"
          )}
        />
        <InlineError message={errorMessage} fieldID="object-type" />
        <ImportDropzone />
        <TextField
          label="Notification email address"
          onChange={handleEmailChange}
          value={email}
          type="email"
          helpText={
            <span>
              We'll use this email address to notify you when the import is
              complete.
            </span>
          }
        />
        <Button submit primary>
          Import
        </Button>
      </FormLayout>
    </Form>
  );

  return <Card sectioned>{formGroupMarkup}</Card>;
}

function ImportDropzone() {
  const [file, setFile] = useState();
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, rejectedFiles) => {
      setFile((file) => acceptedFiles[0]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  const validFileTypes = ["file/csv"];

  const fileUpload = !file && (
    <DropZone.FileUpload
      actionTitle="Add CSV file"
      actionHint="or drop file here"
    />
  );
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validFileTypes.indexOf(file.type) > 0
            ? window.URL.createObjectURL(file)
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
      />
      <div>
        {file.name} <Caption>{file.size} bytes</Caption>
      </div>
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner title="The following files couldn’t be uploaded:" status="critical">
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .csv.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone
        allowMultiple={false}
        type="file"
        accept="file/csv"
        errorOverlayText="File type must be .csv"
        onDrop={handleDropZoneDrop}
      >
        {uploadedFile}
        {fileUpload}
      </DropZone>
    </Stack>
  );
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
