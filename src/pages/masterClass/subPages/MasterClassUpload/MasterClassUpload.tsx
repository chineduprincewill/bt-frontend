import Logo from '../../../../assets/blackat_icon.svg';
import MasterClassDropzoneLayout from './components/MasterClassDropzoneLayout';

export default function MasterClassUpload() {

    return (
        <div className="w-full items-center flex flex-col min-h-screen relative">
            <div className="left-0 right-0 top-0 w-full h-12 bg-white p-1 z-50">
                <img src={Logo} alt="image" className="object-cover mx-auto h-full" />
            </div>
            <div className="max-w-4xl w-full mx-auto min-h-[calc(100vh-60px)] mt-8 md:mt-0 flex flex-col justify-center">
                <h2 className="text-center w-full font-semibold text-xl mt-4">Upload Masterclass video</h2>
                <div className="bg-white grid md:grid-cols-2 gap-8 mt-7 px-8 pb-8">
                    <MasterClassDropzoneLayout />
                </div>
            </div>
        </div>
    );
}
