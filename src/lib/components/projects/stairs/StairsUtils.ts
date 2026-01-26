/**
 * Utility functions for the stairs canvas - Copied from sharedsvelte
 */

// Theme colors
export const COLORS = {
    border: '#5A5A5A',
    borderSecondary: '#9EA6AB',
    margin: '#E39CFB',
    room: '#E2EBF0',
    roomDarkLine: '#AEBFC9',
    cabinet: '#FFFFFF',
    cabinetSecondary: '#E0D0C0',
    facade: '#aacfed',
    text: '#111827',
} as const;

/**
 * Converts a x/y coordinate to stairs canvas coordinates, applying the scale and offsets
 * This function centers the furniture in the canvas both horizontally and vertically
 */
export function toStairsCanvasCoords(
    x: number, 
    y: number,
    scale: number,
    canvasWidth: number,
    canvasHeight: number,
    furnitureWidth: number,
    furnitureHeight: number,
    offsetX: number = 0,
    offsetY: number = 0,
): [number, number] {
    const scaledWidth = furnitureWidth * scale;
    const scaledHeight = furnitureHeight * scale;
    
    const centeringX = (canvasWidth - scaledWidth) / 2;
    const centeringY = (canvasHeight - scaledHeight) / 2;
    
    return [
        x * scale + centeringX + offsetX,
        y * scale + centeringY + offsetY
    ];
}

/**
 * Draws the top floor outline on the canvas
 */
export function drawTopFloor(
    ctx: CanvasRenderingContext2D, 
    height: number,
    width: number,
    side: 'left' | 'right',
    scale: number,
    canvasWidth: number,
    canvasHeight: number,
    furnitureWidth: number,
    furnitureHeight: number
) {
    const isLeft = side === 'left';
    const coordsCalc = (x: number, y: number) => 
        toStairsCanvasCoords(x, y, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    
    const transformX = (x: number) => isLeft ? x : width - x;
    
    const nearX = transformX(-15);
    const farX = transformX(-350);
    
    const finalLeftX = Math.min(nearX, farX);
    const finalRightX = Math.max(nearX, farX);
    
    const topLeft = coordsCalc(finalLeftX, 0);
    const topRight = coordsCalc(finalRightX, 0);
    const bottomNear = coordsCalc(nearX, height * 0.9);
    
    ctx.beginPath();
    ctx.moveTo(topLeft[0], topLeft[1]);
    ctx.lineTo(topRight[0], topRight[1]);

    const gradientTop = ctx.createLinearGradient(topLeft[0], topLeft[1], topRight[0], topRight[1]);
    if (isLeft) {
        gradientTop.addColorStop(1, COLORS.border);
        gradientTop.addColorStop(0, 'rgba(0, 0, 0, 0)');
    } else {
        gradientTop.addColorStop(0, COLORS.border);
        gradientTop.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }

    ctx.strokeStyle = gradientTop;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.beginPath();
    if (isLeft) {
        ctx.moveTo(topRight[0], topRight[1]);
        ctx.lineTo(bottomNear[0], bottomNear[1]);
    } else {
        ctx.moveTo(topLeft[0], topLeft[1]);
        ctx.lineTo(bottomNear[0], bottomNear[1]);
    }
    
    const gradientVertical = isLeft 
        ? ctx.createLinearGradient(topRight[0], topRight[1], bottomNear[0], bottomNear[1])
        : ctx.createLinearGradient(topLeft[0], topLeft[1], bottomNear[0], bottomNear[1]);
    gradientVertical.addColorStop(0, COLORS.border);
    gradientVertical.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.strokeStyle = gradientVertical;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

/**
 * Unified function to draw steps for both left and right sides
 */
export function drawSteps(
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number,
    steps: number,
    topStepWidth: number,
    botStepWidth: number,
    botHeight: number,
    stepNose: number,
    baseThickness: number, 
    giron: number,
    plinthHeight: number,
    side: 'left' | 'right',
    scale: number,
    canvasWidth: number,
    canvasHeight: number,
    furnitureWidth: number,
    furnitureHeight: number,
    boxesClose: number = 0,
    countersteps: number = 0,
    topVertical: number = 0,
    v2: boolean = false
) {
    const isLeft = side === 'left';
    const coordsCalc = (x: number, y: number) => 
        toStairsCanvasCoords(x, y, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    
    const transformX = (x: number) => isLeft ? x : width - x;

    const stepHeight = (height - botHeight) / (steps + (botHeight > 0 ? 0 : 1));
    const practicalSteps = steps - (botStepWidth > 0 ? 1 : 0) - (topStepWidth > 0 ? 1 : 0);
    const stepWidth = (width - stepNose - topStepWidth - botStepWidth) / practicalSteps;
    
    for (let i = 0; i < steps; i++) {
        let leftX = 0;
        let rightX = 0;
        
        if (i === steps - 1 && botStepWidth > 0) {
            if (topStepWidth > 0) {
                leftX = topStepWidth + stepWidth * (i-1) - stepNose;
                rightX = topStepWidth + botStepWidth + stepWidth * (i-1);
            } else {
                leftX = stepWidth * i;
                rightX = botStepWidth + stepWidth * i;
            }
        } else {
            leftX = (topStepWidth > 0) ? (i === 0 ? 0 : (stepWidth * (i-1) + topStepWidth - stepNose)) : stepWidth * i;
            rightX = (topStepWidth > 0) ? (i === 0 ? topStepWidth - stepNose : ( i === steps - 1 ? (stepWidth * i + topStepWidth) : (stepWidth * i + topStepWidth - stepNose))) : stepWidth * (i + 1);
        }

        const transformedLeftX = transformX(leftX);
        const transformedRightX = transformX(rightX);
        
        const finalLeftX = Math.min(transformedLeftX, transformedRightX);
        const finalRightX = Math.max(transformedLeftX, transformedRightX);
        
        const noseOffset = stepNose;
        const noseX = isLeft ? finalRightX + noseOffset : finalLeftX - noseOffset;
        
        const stepTopLeft = coordsCalc(isLeft ? finalLeftX : noseX, stepHeight * (i + 1));
        const stepTopRight = coordsCalc(isLeft ? noseX : finalRightX, stepHeight * (i + 1));
        const stepBottomLeft = coordsCalc(isLeft ? finalLeftX : noseX, stepHeight * (i + 1) + baseThickness);
        const stepBottomRight = coordsCalc(isLeft ? noseX : finalRightX, stepHeight * (i + 1) + baseThickness);
        
        ctx.beginPath();
        if (isLeft) {
            ctx.moveTo(stepTopLeft[0], stepTopLeft[1]);
            ctx.lineTo(stepTopRight[0], stepTopRight[1]);
            ctx.lineTo(stepBottomRight[0], stepBottomRight[1]);
            ctx.lineTo(stepBottomLeft[0], stepBottomLeft[1]);
        } else {
            ctx.moveTo(stepTopRight[0], stepTopRight[1]);
            ctx.lineTo(stepTopLeft[0], stepTopLeft[1]);
            ctx.lineTo(stepBottomLeft[0], stepBottomLeft[1]);
            ctx.lineTo(stepBottomRight[0], stepBottomRight[1]);
        }
        ctx.closePath();
        ctx.fillStyle = COLORS.cabinetSecondary;
        ctx.fill();
        ctx.strokeStyle = COLORS.border;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const underStepX = isLeft ? finalRightX : transformX(finalLeftX);
        const topIsSeparateSection = (!v2 && topStepWidth > 0 && topStepWidth > giron + 1);
        const botIsSeparateSection = (topIsSeparateSection ? (steps - 1) % 2 !== 0 : (steps % 2 !== 0));
        drawUnderStep(ctx, i, underStepX, stepHeight * (i + 1) + baseThickness, baseThickness, plinthHeight, height, width, steps, stepHeight, stepWidth, topStepWidth, botStepWidth, stepNose, boxesClose, countersteps, topIsSeparateSection, botIsSeparateSection, v2, side, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    }

    if (topVertical) {
        const verticalLeftX = transformX(0);
        const verticalRightX = transformX(-baseThickness);
        
        const finalVerticalLeftX = Math.min(verticalLeftX, verticalRightX);
        const finalVerticalRightX = Math.max(verticalLeftX, verticalRightX);
        
        const topLeft = coordsCalc(finalVerticalLeftX, 0);
        const topRight = coordsCalc(finalVerticalRightX, 0);
        const bottomRight = coordsCalc(finalVerticalRightX, stepHeight + baseThickness);
        const bottomLeft = coordsCalc(finalVerticalLeftX, stepHeight + baseThickness);
        
        ctx.beginPath();
        if (isLeft) {
            ctx.moveTo(bottomLeft[0], bottomLeft[1]);
            ctx.lineTo(topLeft[0], topLeft[1]);
            ctx.lineTo(topRight[0], topRight[1]);
            ctx.lineTo(bottomRight[0], bottomRight[1]);
        } else {
            ctx.moveTo(bottomRight[0], bottomRight[1]);
            ctx.lineTo(topRight[0], topRight[1]);
            ctx.lineTo(topLeft[0], topLeft[1]);
            ctx.lineTo(bottomLeft[0], bottomLeft[1]);
        }
        ctx.closePath();
        if (countersteps) {
            ctx.fillStyle = COLORS.cabinetSecondary;
        } else {
            ctx.fillStyle = COLORS.cabinet;
        }
        ctx.fill();
        ctx.strokeStyle = COLORS.border;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

/**
 * Draw under step sections and storage boxes
 */
function drawUnderStep(
    ctx: CanvasRenderingContext2D,
    index: number,
    width: number, 
    height: number, 
    baseThickness: number, 
    plinthHeight: number,
    totalHeight: number,
    totalWidth: number,
    steps: number,
    stepHeight: number,
    stepWidth: number,
    topStepWidth: number,
    botStepWidth: number,
    stepNose: number,
    boxesclose: number,
    countersteps: number,
    topIsSeparateSection: boolean,
    botIsSeparateSection: boolean,
    v2: boolean,
    side: 'left' | 'right',
    scale: number,
    canvasWidth: number,
    canvasHeight: number,
    furnitureWidth: number,
    furnitureHeight: number
) {
    const isLeft = side === 'left';
    const coordsCalc = (x: number, y: number) => 
        toStairsCanvasCoords(x, y, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    
    const transformX = (x: number) => isLeft ? x : totalWidth - x;
    const transformSectionX = (leftEdgeX: number, sectionWidth: number) => 
        isLeft ? leftEdgeX + sectionWidth : totalWidth - leftEdgeX;

    const counterstepDisplacement = countersteps === 1 ? baseThickness : 0;
    
    if ((index + (topIsSeparateSection ? 1 : 0)) % 2 === 0 && index !== steps - 1) {
        if (v2 && index === 0 && (isLeft ? topStepWidth > 0 : true)) {
            const pseudoSectionTopY = height;
            const pseudoSectionWidth = (topStepWidth ? topStepWidth : stepWidth) - (topStepWidth ? stepNose : 0) - baseThickness*2 - counterstepDisplacement;
            const pseudoHeight = height + stepHeight + baseThickness*6;
            const pseudoSectionLeftX = width - baseThickness - counterstepDisplacement - pseudoSectionWidth;
            const pseudoSectionRightX = transformSectionX(pseudoSectionLeftX, pseudoSectionWidth);
            drawSection(ctx, pseudoSectionRightX, pseudoSectionWidth, pseudoSectionTopY, baseThickness, plinthHeight, pseudoHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);

            const sectionTopY = height + stepHeight + baseThickness;
            const sectionWidth = (topStepWidth ? topStepWidth : stepWidth) + stepWidth - (topStepWidth ? stepNose : 0) - baseThickness*2 - counterstepDisplacement;
            const sectionLeftX = width + stepWidth - baseThickness - counterstepDisplacement - sectionWidth;
            const sectionRightX = transformSectionX(sectionLeftX, sectionWidth);
            drawSection(ctx, sectionRightX, sectionWidth, sectionTopY, baseThickness, plinthHeight, totalHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
        } else {
            const leftX = transformX(width - stepWidth + baseThickness);
            const rightX = transformX(width - baseThickness);
            
            const finalLeftX = Math.min(leftX, rightX);
            const finalRightX = Math.max(leftX, rightX);
            
            const topLeft = coordsCalc(finalLeftX, height + (v2 ? 0 : baseThickness));
            const topRight = coordsCalc(finalRightX, height + (v2 ? 0 : baseThickness));
            const bottomRight = coordsCalc(finalRightX, height + stepHeight);
            const bottomLeft = coordsCalc(finalLeftX, height + stepHeight);
            
            ctx.beginPath();
            ctx.moveTo(bottomLeft[0], bottomLeft[1]);
            ctx.lineTo(topLeft[0], topLeft[1]);
            ctx.lineTo(topRight[0], topRight[1]);
            ctx.lineTo(bottomRight[0], bottomRight[1]);
            ctx.closePath();
            if (boxesclose === 0) {
                ctx.fillStyle = COLORS.room;
                ctx.fill();
            } else {
                ctx.fillStyle = COLORS.cabinet;
                ctx.fill();
            }
            ctx.strokeStyle = COLORS.border;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            const sectionTopY = height + stepHeight + baseThickness;
            if (index === steps - 2) {
                const sectionWidth = (botStepWidth ? botStepWidth : stepWidth) + stepWidth + (topStepWidth ? stepNose : 0) - baseThickness*2 - counterstepDisplacement;
                const sectionLeftX = width + (botStepWidth ? botStepWidth : stepWidth) - baseThickness + (topStepWidth ? stepNose : 0) - counterstepDisplacement - sectionWidth;
                const sectionRightX = transformSectionX(sectionLeftX, sectionWidth);
                drawSection(ctx, sectionRightX, sectionWidth, sectionTopY, baseThickness, plinthHeight, totalHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
            } else {
                const sectionWidth = stepWidth*2 - baseThickness*2 - counterstepDisplacement;
                const sectionLeftX = width + stepWidth - baseThickness - counterstepDisplacement - sectionWidth;
                const sectionRightX = transformSectionX(sectionLeftX, sectionWidth);
                drawSection(ctx, sectionRightX, sectionWidth, sectionTopY, baseThickness, plinthHeight, totalHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
            }
        }
    } else if (!v2 && index === 0 && topIsSeparateSection) {
        const sectionTopY = height;
        const sectionWidth = (topStepWidth ? topStepWidth : stepWidth) - (topStepWidth ? stepNose : 0) - baseThickness*2 - counterstepDisplacement;
        const sectionLeftX = width - baseThickness - counterstepDisplacement - sectionWidth;
        const sectionRightX = transformSectionX(sectionLeftX, sectionWidth);
        drawSection(ctx, sectionRightX, sectionWidth, sectionTopY, baseThickness, plinthHeight, totalHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    
    } else if (index === steps - 1 && botIsSeparateSection) {
        const sectionWidth = (botStepWidth ? botStepWidth : stepWidth) + (topStepWidth ? stepNose : 0) - baseThickness*2 - counterstepDisplacement;
        const sectionLeftX = width - baseThickness - counterstepDisplacement - sectionWidth;
        const sectionRightX = transformSectionX(sectionLeftX, sectionWidth);
        if (v2) {
            const sectionTopY = height;
            drawSection(ctx, sectionRightX, sectionWidth, sectionTopY, baseThickness, plinthHeight, totalHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
        } else {
            const sectionTopY = height - baseThickness;
            drawSection(ctx, sectionRightX, sectionWidth, sectionTopY, baseThickness, plinthHeight, totalHeight, v2, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
        }
    }

    if (index === 0) {
        const originX = isLeft ? 0 : totalWidth;
        const verticalLineStart = coordsCalc(originX, height);
        const verticalLineEnd = coordsCalc(originX, totalHeight - plinthHeight);

        ctx.beginPath();
        ctx.moveTo(verticalLineStart[0], verticalLineStart[1]);
        ctx.lineTo(verticalLineEnd[0], verticalLineEnd[1]);
        ctx.stroke();
    }

    if (index !== steps - 1) {
        const verticalLineX = transformX(width);
        const verticalLineStart = coordsCalc(verticalLineX, height);
        const verticalLineEnd = coordsCalc(verticalLineX, height + stepHeight);

        if (countersteps === 1) {
            const backLineX = transformX(width - baseThickness);
            const verticalLineBackTop = coordsCalc(backLineX, height);
            const verticalLineBackBottom = coordsCalc(backLineX, height + stepHeight);
            
            ctx.beginPath();
            ctx.moveTo(verticalLineBackTop[0], verticalLineBackTop[1]);
            ctx.lineTo(verticalLineBackBottom[0], verticalLineBackBottom[1]);
            ctx.lineTo(verticalLineEnd[0], verticalLineEnd[1]);
            ctx.lineTo(verticalLineStart[0], verticalLineStart[1]);
            ctx.closePath();
            ctx.fillStyle = COLORS.cabinetSecondary;
            ctx.fill();
            ctx.strokeStyle = COLORS.border;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(verticalLineStart[0], verticalLineStart[1]);
            ctx.lineTo(verticalLineEnd[0], verticalLineEnd[1]);
            ctx.stroke();
        }
    } else {
        if (countersteps === 1) {
            const leftX = transformX(width - baseThickness);
            const rightX = transformX(width);
            
            const finalLeftX = Math.min(leftX, rightX);
            const finalRightX = Math.max(leftX, rightX);
            
            const topLeft = coordsCalc(finalLeftX, height);
            const topRight = coordsCalc(finalRightX, height);
            const bottomRight = coordsCalc(finalRightX, totalHeight);
            const bottomLeft = coordsCalc(finalLeftX, totalHeight);

            ctx.beginPath();
            ctx.moveTo(topLeft[0], topLeft[1]);
            ctx.lineTo(topRight[0], topRight[1]);
            ctx.lineTo(bottomRight[0], bottomRight[1]);
            ctx.lineTo(bottomLeft[0], bottomLeft[1]);
            ctx.closePath();
            ctx.fillStyle = COLORS.cabinetSecondary;
            ctx.fill();
            ctx.strokeStyle = COLORS.border;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        } else {
            const verticalLineX = transformX(width);
            const verticalLineStart = coordsCalc(verticalLineX, height);
            const verticalLineEnd = coordsCalc(verticalLineX, totalHeight - plinthHeight);

            ctx.beginPath();
            ctx.moveTo(verticalLineStart[0], verticalLineStart[1]);
            ctx.lineTo(verticalLineEnd[0], verticalLineEnd[1]);
            ctx.stroke();
        }
    }
}

/**
 * Draw storage section under stairs
 */
function drawSection(
    ctx: CanvasRenderingContext2D,
    X: number,
    width: number,
    height: number,
    baseThickness: number,
    plinthHeight: number,
    totalHeight: number,
    v2: boolean,
    scale: number,
    canvasWidth: number,
    canvasHeight: number,
    furnitureWidth: number,
    furnitureHeight: number,
    drawV2Pannel: boolean = true
) {
    const coordsCalc = (x: number, y: number) => 
        toStairsCanvasCoords(x, y, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    
    const Yoffset = v2 ? 80 : baseThickness*2;
    const overflowUnder = totalHeight - height - Yoffset < plinthHeight + baseThickness;
    const overflowYoffsetReplacer = Math.abs(totalHeight - height - plinthHeight - baseThickness);

    if (!overflowUnder) {
        const topLeft = coordsCalc(X, height + Yoffset);
        const topRight = coordsCalc(X - width, height + Yoffset);
        const bottomRight = coordsCalc(X - width, totalHeight - plinthHeight - baseThickness);
        const bottomLeft = coordsCalc(X, totalHeight - plinthHeight - baseThickness);
        ctx.beginPath();
        ctx.moveTo(bottomLeft[0], bottomLeft[1]);
        ctx.lineTo(topLeft[0], topLeft[1]);
        ctx.lineTo(topRight[0], topRight[1]);
        ctx.lineTo(bottomRight[0], bottomRight[1]);
        ctx.closePath();
        ctx.fillStyle = COLORS.room;
        ctx.fill();
        ctx.strokeStyle = COLORS.border;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    if (v2 && drawV2Pannel) {
        const topRectLeft = coordsCalc(X, height);
        const topRectRight = coordsCalc(X - width, height);
        const topRectBottom = coordsCalc(X - width, height + (overflowUnder ? overflowYoffsetReplacer : Yoffset));
        const topRectTop = coordsCalc(X, height + (overflowUnder ? overflowYoffsetReplacer : Yoffset));
        ctx.beginPath();
        ctx.moveTo(topRectLeft[0], topRectLeft[1]);
        ctx.lineTo(topRectRight[0], topRectRight[1]);
        ctx.lineTo(topRectBottom[0], topRectBottom[1]);
        ctx.lineTo(topRectTop[0], topRectTop[1]);
        ctx.closePath();
        ctx.strokeStyle = COLORS.border;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

/**
 * Draw base/plinth
 */
export function drawBase(
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    plinthHeight: number,
    plinthLeft: number,
    plinthRight: number,
    stepNose: number,
    side: 'left' | 'right',
    scale: number,
    canvasWidth: number,
    canvasHeight: number,
    furnitureWidth: number,
    furnitureHeight: number,
    baseType: number = 2
) {
    const isLeft = side === 'left';
    const coordsCalc = (x: number, y: number) => 
        toStairsCanvasCoords(x, y, scale, canvasWidth, canvasHeight, furnitureWidth, furnitureHeight);
    
    if (baseType === 2) {
        ctx.beginPath();
        
        const transformX = (x: number) => isLeft ? x : width - x;
        
        const leftX = transformX(plinthLeft);
        const rightX = transformX(width - plinthRight - stepNose);
        
        const finalLeftX = Math.min(leftX, rightX);
        const finalRightX = Math.max(leftX, rightX);
        
        const topLeft = coordsCalc(finalLeftX, height - plinthHeight);
        const topRight = coordsCalc(finalRightX, height - plinthHeight);
        const bottomLeft = coordsCalc(finalLeftX, height);
        const bottomRight = coordsCalc(finalRightX, height);
        
        ctx.moveTo(topLeft[0], topLeft[1]);
        ctx.lineTo(bottomLeft[0], bottomLeft[1]);
        ctx.lineTo(bottomRight[0], bottomRight[1]);
        ctx.lineTo(topRight[0], topRight[1]);

        const baseLeftX = transformX(0);
        const baseRightX = transformX(width - stepNose);
        const baseFinalLeftX = Math.min(baseLeftX, baseRightX);
        const baseFinalRightX = Math.max(baseLeftX, baseRightX);
        
        const baseTopLeft = coordsCalc(baseFinalLeftX, height - plinthHeight);
        const baseTopRight = coordsCalc(baseFinalRightX, height - plinthHeight);
        ctx.moveTo(baseTopLeft[0], baseTopLeft[1]);
        ctx.lineTo(baseTopRight[0], baseTopRight[1]);

        ctx.strokeStyle = COLORS.border;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}
