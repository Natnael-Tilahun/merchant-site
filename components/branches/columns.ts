import type { ColumnDef } from "@tanstack/vue-table";

import { Checkbox } from "../ui/checkbox";
import BranchesDataTableRowActionsVue from "./DataTableRowActions.vue";
import DataTableColumnHeaderVue from "~/components/ui/dataTable/ColumnHeader.vue";


export const columns: ColumnDef<Branch>[] = [
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
    accessorKey: "merchantBranchId",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("branch_id");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const merchantBranchId = row.getValue("merchantBranchId");
      return merchantBranchId ? h(
        "div",
        { class: "w-[100px] whitespace-nowrap truncate hover:w-full font-medium" },
        row.getValue("merchantBranchId")
      ) : h("p", "-");
    },
  },
  {
    accessorKey: "branchName",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("branch_name");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const branchName = row.getValue("branchName");
      return branchName ? h("p", branchName) : h("p", "-");
    },
  },
  {
    accessorKey: "branchCode",
      header: ({ column }) => {
      const { t } = useI18n();
      const title = t("branch_code");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const branchCode = row.getValue("branchCode");
      return branchCode ? h("p", branchCode) : h("p", "-");
    },
  },
  {
    accessorKey: "businessPhoneNumber",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("phone_number");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const businessPhoneNumber = row.getValue("businessPhoneNumber");
      return businessPhoneNumber ? h("p", businessPhoneNumber) : h("p", "-");
    },
  },
  {
    accessorKey: "faxNumber",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("fax_no");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const faxNumber = row.getValue("faxNumber");
      return faxNumber ? h("p", faxNumber) : h("p", "-");
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("city");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const city = (row.getValue("address") as Address).city;
      return city ? h("p", city) : h("p", "-");
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("email");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const businessEmail = (row.getValue("address") as Address).businessEmail;
      return businessEmail ? h("p", businessEmail) : h("p", "-");
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      const { t } = useI18n();
      const title = t("postal_no");
      return h(DataTableColumnHeaderVue, { column, title });
    },
    cell: ({ row }) => {
      const postalNumber = (row.getValue("address") as Address).postalNumber;
      return postalNumber ? h("p", postalNumber) : h("p", "-");
    },
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
        h(BranchesDataTableRowActionsVue, {
          row,
        })
      );
    },
  },
];
