import type { Components } from "@/api";
import { attributePreferredOrder } from "@/config";
import { Grid, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { DataRow, labels } from "./DataRow";

interface Props {
  attributes: Components.Schemas.Attribute[];
}

export default function Attributes({ attributes }: Props) {
  const intl = useIntl();

  return (
    <>
      <Typography variant="h2" gutterBottom>
        <FormattedMessage defaultMessage="Attribuutit" />
      </Typography>
      <Grid container spacing={2}>
        {attributes.length ? (
          attributes
            .map((attribute) => {
              const attributeMessageDescriptor =
                labels[attribute.name as keyof typeof labels];

              return {
                ...attribute,
                label:
                  attributeMessageDescriptor &&
                  intl.formatMessage(attributeMessageDescriptor),
              };
            })
            .sort(
              (a, b) =>
                2 *
                  (attributePreferredOrder.indexOf(b.name) -
                    attributePreferredOrder.indexOf(a.name)) -
                (b.label ?? b.name).localeCompare(a.label ?? a.name)
            )
            .map(({ name, value }) => (
              <DataRow key={name} object={{ [name]: value }} path={name} />
            ))
        ) : (
          <Grid item>–</Grid>
        )}
      </Grid>
    </>
  );
}