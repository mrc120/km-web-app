
export const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Te pola są wymagane!
        </div>
      );
    }
  };
  
  export const vusername = (value) => {
    if (value.length < 3 || value.length > 32) {
      return (
        <div className="alert alert-danger" role="alert">
          Login musi posiadać minimum 3 znaki.
        </div>
      );
    }
  };
  
  export const vpassword = (value) => {
    if (value.length < 6 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          Hasło musi posiadać min. 6 znaków.
        </div>
      );
    }
  };
  