# Unit 10 Lesson 10.3 Student Lab: Computer Vision Kernels, IoU & AI Compute Hardware

Complete all `TODO` functions in [`cvKernelAndIouLab.mjs`](./cvKernelAndIouLab.mjs) using zero-dependency Node 24 ESM:

1. `rgbaBufferToGrayscaleGrid(rgbaBuffer, width, height, options)` — Convert Canvas `ImageData` RGBA bytes into 2D Rec. 601 luminance (`0.299R + 0.587G + 0.114B`).
2. `convolve2D(grid, kernel, options)` — Apply odd square kernels (such as `BOX_BLUR_KERNEL`) with `'clamp'` or `'zero'` border padding.
3. `detectSobelEdges(grid, options)` — Run `SOBEL_X_KERNEL` + `SOBEL_Y_KERNEL` and compute edge magnitude $\sqrt{G_x^2 + G_y^2}$.
4. `applyBinaryThreshold(grid, threshold, options)` — Segment foreground edge/object intensity masks cleanly.
5. `computeBoundingBoxIoU(boxA, boxB)` — Compute object detection Intersection over Union (`IoU`) for `{ x, y, width, height }` bounding boxes.
6. `recommendEdgeVsCloud(workload)` — Evaluate latency budgets, offline privacy, and matrix training to select `EDGE_NPU`, `CLOUD_GPU`, or `CLOUD_TPU`.

Run from the repository root:
```bash
node 0-student_files/10-computer-vision/cvKernelAndIouLab.mjs
```
