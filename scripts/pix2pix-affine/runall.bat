echo '256x256 8-Grid binary'
mkdir 256_grid8_bin_export
mkdir 256_grid8_bin_keras
mkdir 256_grid8_bin_tfjs
python pix2pix.py --mode export --output_dir 256_grid8_bin_export/ --checkpoint 256_grid8_bin/ --which_direction BtoA
python convert_keras.py --dir 256_grid8_bin_export --out 256_grid8_bin_keras
tensorflowjs_converter --input_format keras --output_format tensorflowjs 256_grid8_bin_keras/keras.h5 256_grid8_bin_tfjs/

echo '256x256 8-Grid gradient'
mkdir 256_grid8_grad_export
mkdir 256_grid8_grad_keras
mkdir 256_grid8_grad_tfjs
python pix2pix.py --mode export --output_dir 256_grid8_grad_export/ --checkpoint 256_grid8_grad/ --which_direction BtoA
python convert_keras.py --dir 256_grid8_grad_export --out 256_grid8_grad_keras
tensorflowjs_converter --input_format keras --output_format tensorflowjs 256_grid8_grad_keras/keras.h5 256_grid8_grad_tfjs

echo '256x256 16-Grid binary'
mkdir 256_grid16_bin_export
mkdir 256_grid16_bin_keras
mkdir 256_grid16_bin_tfjs
python pix2pix.py --mode export --output_dir 256_grid16_bin_export/ --checkpoint 256_grid16_bin/ --which_direction BtoA
python convert_keras.py --dir 256_grid16_bin_export --out 256_grid16_bin_keras
tensorflowjs_converter --input_format keras --output_format tensorflowjs 256_grid16_bin_keras/keras.h5 256_grid16_bin_tfjs

echo '256x256 16-Grid gradient'
mkdir 256_grid16_grad_export
mkdir 256_grid16_grad_keras
mkdir 256_grid16_grad_tfjs
python pix2pix.py --mode export --output_dir 256_grid16_grad_export/ --checkpoint 256_grid16_grad/ --which_direction BtoA
python convert_keras.py --dir 256_grid16_grad_export --out 256_grid16_grad_keras
tensorflowjs_converter --input_format keras --output_format tensorflowjs 256_grid16_grad_keras/keras.h5 256_grid16_grad_tfjs