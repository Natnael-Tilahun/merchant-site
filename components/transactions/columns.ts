import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "../ui/checkbox";
import DataTableColumnHeaderVue from "~/components/ui/dataTable/ColumnHeader.vue";
import TransactionsDataTableRowActionsVue from "./DataTableRowActions.vue";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "merchantTransactionId",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("transaction_id");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const merchantTransactionId = row.getValue("merchantTransactionId");
      return merchantTransactionId ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        row.getValue("merchantTransactionId")
      ) : h("p", "-");
    },
  },
  {
    accessorKey: "payerName",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("payer_name");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const payerName = row.getValue("payerName");
      return payerName ? h("p", payerName) : h("p", "-");
    },
  },
  {
    accessorKey: "payerAccountNumber",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("payer_account_number");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const payerAccountNumber = row.getValue("payerAccountNumber");
      return payerAccountNumber ? h("p", payerAccountNumber) : h("p", "-");
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("amount");
      return h(DataTableColumnHeaderVue, { column, title });
    },
  },
  {
    accessorKey: "tipAmount",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("tip_amount");
      return h(DataTableColumnHeaderVue, { column, title });
    },
  },
  {
    accessorKey: "currencyCode",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("currency_code");
      return h(DataTableColumnHeaderVue, { column, title });
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("payment_status");
      return h(DataTableColumnHeaderVue, { column, title });
    },
  },
  {
    accessorKey: "paymentReference",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("payment_reference");
      return h(DataTableColumnHeaderVue, { column, title });
    },
  },
  {
    accessorKey: "transactionInitiator",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("transaction_initiator");
      return h(DataTableColumnHeaderVue, { column, title });
    },
  },
  {
    accessorKey: "expirationDate",
      header: ({ column }) => {
      const { t } = useI18n();
      const title = t("expiration_date");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => new Date(row.getValue("expirationDate")).toLocaleDateString(),
  },
  {
    header: () => {
      const { t } = useI18n();
      const title = t("actions");
      return title;
    },
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative" },
        h(TransactionsDataTableRowActionsVue, {
          row,
        })
      );
    },
  },
];
