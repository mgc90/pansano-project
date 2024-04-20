/* Componente de products extraído de primereact desde cuarta linea para abajo tal cual, cambiado el useeffect*/
import { updateProducto, deleteProducto, createProducto/*, getAllProductos*/ } from '../../../../api/productos.api';
import "./ProductosList.css"
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';

import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import axios from 'axios';




export default function ProductsDemo() {
    let emptyProduct = {
        
        name: '',
        price: 0,
        img: "",
        quanty: 1,
        description: '',
       
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    /*HOOK PARA LLAMAR PRODUCTOS DESDE EL SERVER DJANGO */
    /*useEffect(() => {
        getAllProductos().then((res) => setProducts(res.data));
      }, []);*/

      /*HOOK PARA LLAMAR PRODUCTOS DESDE JSON LOCAL */
      useEffect(() => {
        axios("data.json").then((res) => setProducts(res.data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);
                /* HER IS API FUNCTION TO UPDATE PRODUCT */
                updateProducto(product.id, product)
                console.log(product)
                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                /**HERE IS imported function for axios's connection with API, createProducto */
                 createProducto(product);

                _product.img = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
            
        }
        
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        
        /*llamado a la funcion de api para borrar desde boton individual*/
        deleteProducto(product.id);
        
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

 
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
        
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);

        /*ACA ES PARA BORRAR EL SELECCIONADO DESDE EL BOTÓN DELETE AL LADO DEL NEW. debo reparar para borrar de a varios */
        selectedProducts.map(item => deleteProducto(item.id));

        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.img}`} alt={rowData.img} className="shadow-2" style={{ width: '3rem', height: '3rem' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

 
   

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

  

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Administrar Productos</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className='totalComponent'>
            <Toast ref={toast} />
            <div className="card" >
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value) } 
                        reorderableColumns reorderableRows onRowReorder={(e) => setProducts(e.value)}  //responsiveLayout="stack" breakpoint='600px'
                        dataKey="id"  paginator rows={25} rowsPerPageOptions={[5, 10, 25, 50]} key={product.id} fit="true" showGridlines="true"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" 
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos" globalFilter={globalFilter} header={header} >
                    
                    
                    <Column  key="seleccionar" columnKey='seleccionar' selectionMode="multiple" exportable={false}  ></Column>
                    <Column field="id" header="ID" sortable key="id" columnKey="id" ></Column>
                    <Column field="name" header="Nombre" sortable key="name" columnKey="name" ></Column>
                    <Column field="img" header="Imagen" body={imageBodyTemplate} ></Column>
                    <Column field="price" header="Precio" body={priceBodyTemplate} sortable ></Column>
                    <Column header="Edit" key="editar" columnKey='editar' body={actionBodyTemplate} exportable={false} ></Column>
                    <Column header="Mover" key="mover" columnKey='mover' rowReorder style={{ minWidth: '3rem' }} />
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '30rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="img" className="font-bold">
                        Imagen
                    </label>
                    {product.img && <img src={`${product.img}`} style={{ width: '15rem', height: '15rem' }} alt={product.img} className="product-image block m-auto pb-3" />}
                    <div style={{display: 'flex'}}>
                        <input type="hidden" id="img" value={product.img} onChange={(e) => onInputChange(e, 'img')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.img })} style={{ width: '20rem'}} />
                        <FileUpload  FileNameElement={product.img} mode="basic" name="demo[]" url="/public/imgs" accept="image/*" maxFileSize={1000000} /> 
                    </div>
                    
                    
                    
                    {submitted && !product.img && <small className="p-error">Image is required.</small>}
                    </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nombre
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Precio
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>

                    

                    <div className="field col">
                        <label htmlFor="quanty" className="font-bold">
                            Cantidad
                        </label>
                        <InputNumber id="quanty" value={product.quanty} onValueChange={(e) => onInputNumberChange(e, 'quanty')} />
                    </div>

                    <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Descripción
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            ¿Seguro desea borrar<b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>¿Está seguro de borrar el producto seleccionado?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        