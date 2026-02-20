1. Wave (Wave Financial) API
These let your developer read invoices, customers, and transactions and react when new invoices are created or sent.

Wave - Developer Portal (API landing)
https://developer.waveapps.com/hc/en-us
​

Wave API Reference (GraphQL)
https://developer.waveapps.com/hc/en-us/articles/360019968212-API-Reference
​

Wave Business APIs (modern docs)
https://docs.wave.com/business
​

Wave API Authentication (getting keys)
https://docs.wave.com/payout (includes how to get your API key)
​

2. Helcim APIs and payment automation
These let your developer create invoices, customers, and payment links when a Wave invoice is created.

Helcim Developer API (overview)
https://www.helcim.com/developer-api/
​

Helcim API “Key Features & Benefits” (high‑level)
https://learn.helcim.com/docs/understanding-helcim-api
​

Helcim Invoice API (create invoices)
https://devdocs.helcim.com/docs/invoice-api
​

Helcim Customer API (manage customers)
https://devdocs.helcim.com/docs/customer-api

Helcim Webhooks (payment confirmation trigger + signature verification)
https://devdocs.helcim.com/docs/webhooks

HelcimPay.js Initialize (checkout session init; returns checkoutToken + secretToken)
https://devdocs.helcim.com/docs/initialize-helcimpayjs

Validate a HelcimPay.js Payment (server-side validation pattern)
https://devdocs.helcim.com/docs/validate-helcimpayjs

Managing Customers and Invoices through HelcimPay.js (customerRequest/invoiceRequest, invoiceNumber/orderNumber)
https://devdocs.helcim.com/docs/managing-customers-and-invoices-through-helcimpayjs

Helcim Payments API (needed to fetch transaction details after webhook, since webhook payload can be minimal)
https://devdocs.helcim.com/docs/payments
​

Helcim Payment Links / Payment Requests
https://www.helcim.com/guides/how-to-use-payment-links/
​
https://learn.helcim.com/docs/using-helcim-payment-requests
​

Helcim Payment Extension / broader integration guide (for context)
https://learn.helcim.com/docs/integrate-with-helcim-payment-extension
​

Helcim Learn – Invoicing / payment flows (reference)
https://learn.helcim.com/docs/create-a-helcim-invoice
​

3. Optional (for dev context)
Helcim API integration best‑practices
https://help-center.atlasbeta.so/getatlas-5cchphepdm/articles/495892-api-integration-guide (general guidance on integrating with Helcim)
​

Example of pulling invoice data from Wave (for ideas)
https://www.reddit.com/r/waveapps/comments/1n5tpaf/how_to_create_an_api_to_pull_invoice_data_from/ (shows a GraphQL query pattern)
​