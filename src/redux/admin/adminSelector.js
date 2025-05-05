import { createSelector } from "@reduxjs/toolkit";

export const selectAdmin = (state) => state.admin;

export const selectAdminName = createSelector(
  [selectAdmin],
  (admin) => admin.name
);

export const selectAdminRole = createSelector(
  [selectAdmin],
  (admin) => admin.role
);


export const selectAdminToken = createSelector(
  [selectAdmin],
  (admin) => admin.token
);

