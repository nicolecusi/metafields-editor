import { Card, Layout, Page, FormLayout } from "@shopify/polaris";

const BulkImport = () => (
  <Page title="Bulk Import">
    <Layout>
      <Layout.AnnotatedSection
        title="Bulk import"
        description="Jaded Pixel will use this as your account information."
      >
        <Card sectioned>
          <FormLayout></FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    </Layout>
  </Page>
);
export default BulkImport;
