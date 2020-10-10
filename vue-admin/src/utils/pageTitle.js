export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - Vue Admin`;
    }
    return "Vue Admin";
}
