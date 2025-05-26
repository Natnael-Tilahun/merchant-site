interface User {
    email: string;
    id: string;
    password: string;
    role: string[];
}

interface UserInput {
    username: string;
    password: string;
    rememberMe: boolean;
}

interface UserWithoutPassword {
    email: string;
    id: string;
    role: string[];
}

interface Address {
    city: string;
    businessEmail: string
    postalNumber: string;
}

interface Merchant {
    customerIdId: string
    merchantId?: string
    businessType: string;
    businessNumber: string
    businessName: string
    tradeLicenseNumber: string
    tradeLicenseIssueDate: string
    tradeLicenseExpiryDate: string
    taxPayerIdNumber: string
    taxPayerIssueDate: string
    taxPayerExpiryDate: string
    businessPhoneNumber?: string
    faxNumber: string
    address?: Address
    shortCode: string
    status: Status
    qrCodeDataBase64?:string
    staticQrData?:string
    merchantLevel?:string
    defaultPaymentReceivingAccountNumber?:number
}

interface Branch {
    merchantBranchId: string
    branchName: string
    branchCode: string
    businessPhoneNumber: string
    faxNumber: string
    paymentReceivingAccountNumber: string
    address: Address
}

enum OperatorRole {
    ADMIN, MANAGER, ATTENDANT, SUPERVISOR, NONE
}

interface Employee {
    merchantOperatorId: string
    operatorRole: OperatorRole
    firstName: string
    middleName: string
    fullName: string
    user: User
    merchant: Merchant
    merchantBranch: Branch
}


enum PaymentStatus {
    NONE, PENDING, COMPLETED, FAILED, CANCELLED, EXPIRED
}

enum TransactionInitiator {
    MERCHANT_INITIATED, MERCHANT_OPERATOR_INITIATED, PAYER_INITIATED, NONE
}

interface Transaction {
    merchantTransactionId: string
    merchantId: string
    merchantName?: string
    merchantCity: string
    merchantBranchId?: string
    merchantBranchName: string
    operatorId?: string
    operatorName?: string
    amount: number
    currencyCode: string
    merchantCategoryCode: string
    countryCode: string
    paymentReference: string
    tipAmount: number
    dynamicId: string
    paymentStatus: string
    Enum: PaymentStatus
    expirationDate: string
    transactionInitiator: string
    Enum: TransactionInitiator
    mbTransactionId?: string
    coreTransactionId?: string
    merchantAccountNumber: string
    payerAccountNumber?: string
    payerId?: string
    payerName?: string
    payerPhone?: string
    qrEncodedData?: string
}


export interface ApiError {
    type?: string;
    message?: string;
    detail?: string;
    fieldErrors?: Array<{
      field: string;
      message: string;
    }>;
  }
  
  export interface ApiResponse<T> {
    data: T;
    pending: boolean;
    error: {
      value?: {
        data?: ApiError;
      };
    };
    status: {
      value: 'success' | 'error';
    };
  }
  
  export interface OtpDTO {
    verificationId:	string
    phone?:	string
    expiryTime?:	string
    }
  
  export interface TFAAccessTokenDTO{
    token:	string
    validFrom:	string
    validTo:	string
  }
  
  export interface VerificationRequest{
    verificationId: string
    otp?: 	string
  }

  
  interface AuthResponse {
    accessToken?: string;
    refreshToken?: string;
    permissions?: string[];
  }