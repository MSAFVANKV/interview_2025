import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import { DELETE_PRODUCTS, GET_ALL_PRODUCTS } from "../../../../routers/urlPth";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import useNavigateClicks from "../../../../hooks/navigate-clicks";

function ProductAllPage() {
  const {handleClick} = useNavigateClicks();
  const [expandedRow, setExpandedRow] = useState(null); // Expanded product row
  const [expandedVariation, setExpandedVariation] = useState(null); // Expanded variation row

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(GET_ALL_PRODUCTS, {
          withCredentials: true,
        });
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    },
  });

  // console.log(data,'data');
  

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${DELETE_PRODUCTS}/${productId}`, { withCredentials: true });
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleExpandRow = (productId) => {
    setExpandedRow((prev) => (prev === productId ? null : productId));
    setExpandedVariation(null); // Close any expanded variation
  };

  const toggleExpandVariation = (variationId) => {
    setExpandedVariation((prev) => (prev === variationId ? null : variationId));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const rows = data.map((product) => ({
    id: product._id,
    productName: product.productName,
    mrp: product.mrp,
    thumbnail: product.thumbnail[0] || "",
    variations: product.variations,
  }));

  const rowsWithDetails = rows.flatMap((product) => {
    const productRow = {
      id: product.id,
      productName: product.productName,
      mrp: product.mrp,
      thumbnail: product.thumbnail,
    };

    if (expandedRow === product.id) {
      const variationRows = product.variations.map((variation) => {
        const variationRow = {
          id: variation._id,
          parentId: product.id,
          productName: `Variation: ${variation.variationName}`,
          color: `${variation.colorName} (${variation.colorCode})`,
          thumbnail: variation.photos[0] || "",
          sizeArray: variation.sizeArray,
        };

        if (expandedVariation === variation._id) {
          const sizeRows = variation.sizeArray.map((size, index) => ({
            id: `${variation._id}-size-${index}`,
            parentId: variation._id,
            size: size.size,
            stock: size.stock,
            finalPrice: size.finalPrice,
            discount: size.discount,
          }));

          return [variationRow, ...sizeRows];
        }

        return [variationRow];
      });

      return [productRow, ...variationRows.flat()];
    }

    return [productRow];
  });

  const columns = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 100,
      renderCell: (params) =>
        params.row.thumbnail ? (
          <img
            src={params.row.thumbnail}
            alt="Thumbnail"
            style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          />
        ) : null,
    },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "mrp", headerName: "MRP", width: 100 },
    {
      field: "color",
      headerName: "Color (Code)",
      width: 150,
      renderCell: (params) => params.row.color || "",
    },
    {
      field: "size",
      headerName: "Size",
      width: 100,
      renderCell: (params) => params.row.size || "",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      renderCell: (params) => params.row.stock || "",
    },
    {
      field: "finalPrice",
      headerName: "Final Price",
      width: 120,
      renderCell: (params) => params.row.finalPrice || "",
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 100,
      renderCell: (params) => params.row.discount || "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) =>
        params.row.parentId ? null : (

          <div>
            <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => {
            handleClick(`/admin/products/add?edit=${params.row.id}`);  // Navigate to edit product page with productId as parameter  // handleClick is a custom hook to navigate using react-router-dom's useNavigate() function  // Replace '/admin/products/edit/:productId' with your actual route path  // This will navigate to the edit product page with the selected product's ID in the URL
  
          }}>
            <EditIcon />
          </IconButton>
          </div>
        
        ),
    },
    {
      field: "expand",
      headerName: "Expand",
      width: 100,
      renderCell: (params) =>
        !params.row.size && (
          <IconButton
            onClick={() =>
              params.row.parentId
                ? toggleExpandVariation(params.row.id)
                : toggleExpandRow(params.row.id)
            }
          >
            {(params.row.parentId
              ? expandedVariation === params.row.id
              : expandedRow === params.row.id) ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        ),
    },
  ];

  return (
    <div>
      <div className="product-container bg-white">
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rowsWithDetails}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

export default ProductAllPage;
