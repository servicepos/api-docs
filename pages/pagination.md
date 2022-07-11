# Pagination

Pagination can be done via GET parameters `paginationStart` and `paginationPageLength`. The pagination is based on element count.  
For example, if you want to access the third page of a pagination with 10 items per page use:

`?pagiationStart=20&paginationPageLength=10`

For all endpoints `paginationPageLength` is limited to **250**. We are currently working on implementing this limit.
