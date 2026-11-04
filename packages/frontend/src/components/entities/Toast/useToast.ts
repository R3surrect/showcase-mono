import { useShallow } from "zustand/shallow";
import useToastStore from "./Toast.store";

const useToast = () => useToastStore(useShallow(state => state));
export default useToast;