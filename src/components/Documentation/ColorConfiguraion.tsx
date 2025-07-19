export const ColorConfiguration = () => {
  return (
    <>
      <h3 className=" text-xl font-semibold mt-8 text-white">Colors</h3>
      <div className="p-6 rounded-md border mt-4 border-dark_border border-opacity-60">
        <p className="text-base font-medium text-muted text-opacity-60">
          <span className="font-semibold text-lg text-white">
            1. Override Colors
          </span>{" "}
          <br />
          For any change in colors : tailwind.config.ts
        </p>
        <div className="py-4 px-5 rounded-md bg-dark_grey mt-8">
          <p className="text-sm text-gray-400 flex flex-col gap-2">
            <span>primary: &quot;#99E39E&quot;,</span>
            <span>secondary: &quot;#1DC8CD&quot;,</span>
            <span>midnight_text: &quot;#263238&quot;,</span>
            <span>muted: &quot;#D8DBDB&quot;,</span>
            <span>error: &quot;#CF3127&quot;,</span>
            <span>warning: &quot;#F7931A&quot;,</span>
            <span>light_grey: &quot;#505050&quot;,</span>
            <span>grey: &quot;#F5F7FA&quot;,</span>
            <span>dark_grey: &quot;#1E2229&quot;,</span>
            <span>border: &quot;#E1E1E1&quot;,</span>
            <span>success: &quot;#3CD278&quot;,</span>
            <span>section: &quot;#737373&quot;,</span>
            <span>darkmode: &quot;#000510&quot;,</span>
            <span>darklight: &quot;#0C372A&quot;,</span>
            <span>dark_border: &quot;#959595&quot;,</span>
            <span>tealGreen: &quot;#477E70&quot;,</span>
            <span>charcoalGray: &quot;#666C78&quot;,</span>
            <span>deepSlate: &quot;#282C36&quot;,</span>
            <span>slateGray: &quot;#2F3543&quot;,</span>
          </p>
        </div>
      </div>
      <div className="p-6 rounded-md border mt-4 border-dark_border border-opacity-60">
        <p className="text-base font-medium text-muted text-opacity-60">
          <span className="font-semibold text-lg text-white">
            2. Override Theme Colors
          </span>{" "}
          <br />
          For change , go to : tailwind.config.ts
        </p>
        <div className="py-4 px-5 rounded-md bg-dark_grey mt-8">
          <p className="text-sm text-gray-400 flex flex-col gap-2">
            <span>primary: &quot;#2CDD9B&quot;,</span>
            <span>secondary: &quot;#1DC8CD&quot;,</span>
          </p>
        </div>
      </div>
    </>
  );
};
