import React, { useCallback, useState } from "react";
import {
  Stack,
  Thumbnail,
  DropZone,
  Caption,
  Banner,
  List,
} from "@shopify/polaris";

export default function ImportDropzone() {
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
