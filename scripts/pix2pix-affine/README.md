
# train the model (this may take 1-8 hours depending on GPU, on CPU you will be waiting for a bit)
python pix2pix.py --mode train --output_dir topo16_train_1 --max_epochs 200 --input_dir topo/img16x16_1/train --which_direction BtoA

# test the model
python pix2pix.py --mode test --output_dir topo16_test_1 --input_dir topo/img16x16_1/val --checkpoint topo16_train_1

# export the model
python pix2pix.py --mode export --output_dir topo_train_8x8bin_export/ --checkpoint topo_train_1/ --which_direction BtoA

# Convert model to Keras
python convert_keras.py --dir topo_train_8x8bin_export --out topo_train_8x8bin_keras

# Convert to TFJS
tensorflowjs_convertor --input_format keras --output_format tensorflowjs <input path> <output path>



## EXPORTS ALL MODELS --> KERAS --> TFJS


### 256x256 8-Grid binary
mkdir 256_grid8_bin_export/
mkdir 256_grid8_bin_keras/
mkdir 256_grid8_bin_tfjs/
python pix2pix.py --mode export --output_dir 256_grid8_bin_export/ --checkpoint 256_grid8_bin/ --which_direction BtoA
python convert_keras.py --dir 256_grid8_bin_export/ --out 256_grid8_bin_keras/
tensorflowjs_convertor --input_format keras --output_format tensorflowjs 256_grid8_bin_keras/ 256_grid8_bin_tfjs/

### 256x256 8-Grid gradient
mkdir 256_grid8_grad_export/
mkdir 256_grid8_grad_keras/
mkdir 256_grid8_grad_tfjs/
python pix2pix.py --mode export --output_dir 256_grid8_grad_export/ --checkpoint 256_grid8_grad/ --which_direction BtoA
python convert_keras.py --dir 256_grid8_grad_export/ --out 256_grid8_grad_keras/
tensorflowjs_convertor --input_format keras --output_format tensorflowjs 256_grid8_grad_keras/ 256_grid8_grad_tfjs/

### 256x256 16-Grid binary
mkdir 256_grid16_bin_export/
mkdir 256_grid16_bin_keras/
mkdir 256_grid16_bin_tfjs/
python pix2pix.py --mode export --output_dir 256_grid16_bin_export/ --checkpoint 256_grid16_bin/ --which_direction BtoA
python convert_keras.py --dir 256_grid16_bin_export/ --out 256_grid16_bin_keras/
tensorflowjs_convertor --input_format keras --output_format tensorflowjs 256_grid16_bin_keras/ 256_grid16_bin_tfjs/

### 256x256 16-Grid gradient
mkdir 256_grid16_grad_export/
mkdir 256_grid16_grad_keras/
mkdir 256_grid16_grad_tfjs/
python pix2pix.py --mode export --output_dir 256_grid16_grad_export/ --checkpoint 256_grid16_grad/ --which_direction BtoA
python convert_keras.py --dir 256_grid16_grad_export/ --out 256_grid16_grad_keras/
tensorflowjs_convertor --input_format keras --output_format tensorflowjs 256_grid16_grad_keras/ 256_grid16_grad_tfjs/
