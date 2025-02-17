import Empty from "components/common/Empty";
import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";

function BooksEmpty() {
  return (
    <Empty
      title="No search results found."
      icon={<FaSmileWink />}
      description={<Link to="books">Move to books page</Link>}
    />
  );
}

export default BooksEmpty;
