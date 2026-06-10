"use client";

import { Toast } from "@heroui/react";

// Mounts the global toast viewport so `toast.success()` etc. render.
const ToastRegion = () => <Toast.Provider placement="top-right" />;

export default ToastRegion;
