import React from "react";
import '../index.css';
function FranchiseEmailBody({ pwd, email }) {
  return (
   <p>
        Your franchise application has been accepted. We are thrilled to have
        you as a part of our franchise network.

        We look forward to working with you and helping you achieve your
        business goals.

        Your franchise credentials are as follows: Email: {email}
        Password: {pwd}

        If you have any questions or need further assistance, please don't
        hesitate to reach out to us.

        Best regards,
        The Franchise Team
    </p>
  );
}

export default FranchiseEmailBody;
