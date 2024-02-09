export function TruncatedString({ string, maxLength }) {
    // Function to truncate string to the specified max length
    const truncateString = (str, num) => {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + '...';
    };
  
    return (
      <div>
        {truncateString(string, maxLength)}
      </div>
    );
  }