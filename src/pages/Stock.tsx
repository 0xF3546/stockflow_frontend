import { useParams } from "react-router-dom"
import { StockDetailPage } from "../components/stock-detail-page";

const StockPage = () => {
    const { symbol } = useParams();
    if (!symbol) return null;
    return <StockDetailPage symbol={symbol} />;
}

export default StockPage;