export const parseUsername = (name: string | null | undefined) => {
    if (!name) return undefined;
    return name?.toLowerCase().replace(/\s+/g, "-");
}
