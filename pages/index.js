import { Page, Layout, Card, FormLayout, TextField } from "@shopify/polaris";
import Link from "next/link";

const Index = () => (
  <Page title="Dashboard">
    <Layout>
      <Layout.Section
        title="Bulk import"
        description="Jaded Pixel will use this as your account information."
      >
        <Card sectioned>
          <FormLayout></FormLayout>
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
);

export default Index;
