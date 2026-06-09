export interface PropertyFieldProps {
    title: string;
    subtitle: string;
    children: (id: string) => React.ReactNode;
}