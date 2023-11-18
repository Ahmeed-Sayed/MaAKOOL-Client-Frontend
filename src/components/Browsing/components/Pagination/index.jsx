import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ page, count, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        sx={{
          "& .Mui-selected": {
            backgroundColor: "#007BFF", // Bootstrap primary color
          },
        }}
      />
    </div>
  );
};

export default Pagination;
